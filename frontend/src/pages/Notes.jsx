import { useState, useEffect } from "react";
import { useAsyncError, useLocation } from "react-router-dom";
import api from "../api";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const location = useLocation();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", {
        title,
        content,
      })
      .then((res) => {
        if (res.status === 201) alert("Note is created!");
        else alert("Failed to create note.");
        setIsOpen(false);
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const editNote = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/api/notes/${selectedNote.id}/`, {
        title,
        content,
      });

      alert("Note updated!");
      setIsOpen(false);
      getNotes();
    } catch (err) {
      alert(err);
    }
  };

  const openModal = (note = null) => {
    setSelectedNote(note);

    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }

    setIsOpen(true);
  };

  useEffect(() => {
    if (location.state?.openNewNoteModal && !isOpen) {
      openModal(null);
    }
  }, [location.state]);

  useEffect(() => {
    if (!location.state?.openNoteId || notes.length === 0) return;

    const note = notes.find((n) => n.id === location.state.openNoteId);

    if (note) {
      openModal(note);
    }
  }, [notes, location.state]);

  const filteredNotes = notes.filter((note) => {
    const query = search.toLowerCase();

    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <div className="flex items-center px-4 md:px-8 lg:px-16 mt-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Notes</h1>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mt-6 mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 h-11 px-4 rounded border border-[#40424C] bg-transparent text-white"
        />

        <button
          onClick={() => openModal(null)}
          className="h-11 px-6 sm:px-8 flex items-center justify-center rounded-md bg-indigo-700 hover:bg-indigo-600 text-white gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>

          <span>New Notes</span>
        </button>
      </div>

      <ul className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col gap-3">
        {filteredNotes.length === 0 ? (
          <li className="text-center text-gray-400 py-10">No notes found.</li>
        ) : (
          filteredNotes.map((note) => {
            const colors = [
              "text-red-500",
              "text-blue-500",
              "text-green-500",
              "text-yellow-500",
              "text-purple-500",
              "text-pink-500",
            ];

            const randomColor =
              colors[Math.floor(Math.random() * colors.length)];

            return (
              <li
                key={note.id}
                className="w-full min-h-[100px] p-5 bg-[#121726] hover:bg-[#1f2a3d] rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                onClick={() => openModal(note)}
              >
                <div className="flex w-full justify-between gap-4 items-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`${randomColor} w-8 h-8 md:w-10 md:h-10`}
                  >
                    <path d="M8 2v4" />
                    <path d="M12 2v4" />
                    <path d="M16 2v4" />
                    <rect width="16" height="18" x="4" y="4" rx="2" />
                    <path d="M8 10h6" />
                    <path d="M8 14h8" />
                    <path d="M8 18h5" />
                  </svg>

                  <div className="flex-1 min-w-0">
                    <h1 className="text-lg md:text-xl font-semibold text-white truncate">
                      {note.title}
                    </h1>

                    <p className="mt-1 text-sm text-gray-400 line-clamp-2">
                      {note.content}
                    </p>

                    <p className="text-sm mt-2 text-xs md:text-sm text-gray-400">
                      {new Date(note.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="ml-4 self-start">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                      }}
                      className="cursor-pointer p-1 rounded-md hover:bg-red-500/10 active:scale-95 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="red"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500"
                      >
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M3 6h18" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={selectedNote ? editNote : createNote}
            className="w-[95%] sm:w-[600px] md:w-[700px] lg:w-[800px] max-h-[90vh] overflow-y-auto bg-[#121726] rounded-lg border border-[#40424C] flex flex-col p-5"
          >
            <div className="flex items-center">
              <button
                onClick={() => setIsOpen(false)}
                className="flex px-2 flex row gap-2 text-xl text-white cursor-pointer hover:text-[#1f2a3d]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-left-icon lucide-arrow-left"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Back
              </button>

              <button
                value="Submit"
                type="submit"
                className="flex justify-center h-10 w-19 px-2 flex ml-auto items-center rounded-md text-xl text-white bg-indigo-700 gap-2 cursor-pointer p-4 hover:bg-[#1f2a3d]"
              >
                <span>Save</span>
              </button>
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <h2 className="text-xl text-white ">Title</h2>
              <input
                type="text"
                value={title}
                className="h-10 w-full rounded bg-[#0D1020] border-2 border-[#40424C] text-white px-2"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title"
              />
            </div>

            <div className="mt-5 flex flex-col flex-1 rounded border border-[#333A52]">
              <textarea
                className="w-full h-64 sm:h-80 md:h-[400px] p-4 bg-transparent text-white outline-none resize-none"
                placeholder="Enter notes..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Notes;
