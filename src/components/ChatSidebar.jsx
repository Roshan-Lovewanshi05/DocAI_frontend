// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Sidebar = () => {
//   const [activeItem, setActiveItem] = useState("");
//   const navigate = useNavigate();

//   const onClickHandle = async (item) => {
//     setActiveItem(item.name)
//     if(item.name ==="Home"){
//       navigate("/")

//     }
//     else if(item.name ==="My Files"){
//       try{
//         const token = localStorage.getItem("token");
//         const res = await fetch("http://localhost:9000/read",{
//           method:"GET",
//           headers:{
//             Authorization:`Bearer ${token}`
//           },
//         })
//         const files  = await res.json()
//         console.log(files)

//       }catch(error){
//         console.log(error)
//       }

        
//     }

//   }

//   const menuItems = [
//     {
//       name: "Home",
//       icon: "⌂",
//     },
//     {
//       name: "New Chat",
//       icon: "+",
//     },
//     {
//       name: "My Files",
//       icon: "📁",
//     },
//   ];

//   const recentChats = [
//     "Resume.pdf",
//     "Project Report.pdf",
//     "Company Data.pdf",
//   ];

//   return (
//     <aside className="flex h-[calc(100vh-72px)] w-64 flex-col border-r border-slate-200 bg-white">

//       {/* Main Menu */}
//       <div className="p-4">

//         {menuItems.map((item) => (
//           <button
//             key={item.name}
//             onClick={() => onClickHandle(item) }
//             className={`mb-4 flex w-full items-center gap-5 rounded-xl px-4 py-3 transition-all
//               ${
//                 activeItem === item.name
//                   ? "bg-blue-50 text-blue-600"
//                   : "text-slate-600 hover:bg-slate-50"
//               }`}
//           >
//             <span className="flex h-6 w-6 items-center justify-center text-lg">
//               {item.icon}
//             </span>

//             <span className="text-sm font-medium">
//               {item.name}
//             </span>
//           </button>
//         ))}

//       </div>


//       {/* Divider */}
//       <div className="mx-4 border-t border-slate-200" />


//       {/* Recent Chats */}
//       <div className="flex-1 overflow-y-auto p-4">

//         <h2 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
//           Recent Chats
//         </h2>

//         <div className="space-y-1">

//           {recentChats.map((chat) => (
//             <button
//               key={chat}
//               onClick={() => setActiveItem(chat)}
//               className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition
//                 ${
//                   activeItem === chat
//                     ? "bg-blue-50 text-blue-600"
//                     : "text-slate-600 hover:bg-slate-50"
//                 }`}
//             >
//               <span className="text-sm">📄</span>

//               <span className="truncate text-sm">
//                 {chat}
//               </span>
//             </button>
//           ))}

//         </div>

//       </div>


//       {/* Bottom Section */}
//       <div className="border-t border-slate-200 p-4">

//         {/* Help */}
//         <button
//           onClick={() => setActiveItem("Help")}
//           className={`mb-4 flex w-full items-center gap-3 rounded-xl px-4 py-3 transition
//             ${
//               activeItem === "Help"
//                 ? "bg-blue-50 text-blue-600"
//                 : "text-slate-600 hover:bg-slate-50"
//             }`}
//         >
//           <span className="text-lg">?</span>

//           <span className="text-sm font-medium">
//             Help & Support
//           </span>
//         </button>


//         {/* Settings */}
//         <button
//           onClick={() => setActiveItem("Settings")}
//           className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition
//             ${
//               activeItem === "Settings"
//                 ? "bg-blue-50 text-blue-600"
//                 : "text-slate-600 hover:bg-slate-50"
//             }`}
//         >
//           <span className="text-lg">⚙</span>

//           <span className="text-sm font-medium">
//             Settings
//           </span>
//         </button>

//       </div>

//     </aside>
//   );
// };

// export default Sidebar;







import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

 const API_URL = import.meta.env.VITE_API_URL

const Sidebar = ({normalChat,setNormalChat}) => {
  const navigate = useNavigate();
  
  
  const [activeItem, setActiveItem] = useState("Home");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  

  // Authentication headers
  const getHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  // Fetch files from backend
  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/read`, {
        method: "GET",
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Unable to fetch files (${response.status})`);
      }

      const data = await response.json();

      const fileList = Array.isArray(data)
        ? data
        : Array.isArray(data.files)
          ? data.files
          : [];

      setFiles(fileList);
    } catch (err) {
      console.error("Fetch files error:", err);
      setError("Unable to load files. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load files when sidebar mounts
  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // Home navigation
  const handleHome = () => {
    setActiveItem("Home");
    navigate("/");
  };

  // My Files
  const handleMyFiles = async () => {
    setActiveItem("My Files");
    await fetchFiles();
  };

  // Get file name safely
  const getFileName = (file) =>
    file.file ||
    file.filename ||
    file.name ||
    "Untitled document";

  // Delete file
  const handleDeleteFile = async (file) => {
    const fileName = getFileName(file);

    const confirmed = window.confirm(
      `Are you sure you want to delete "${fileName}"?`
    );

    if (!confirmed) return;

    setDeletingId(file.id);
    setError("");

    try {

      const token = localStorage.getItem("token")
      const response = await fetch(
        `${API_URL}/delete/${file.id}`,
        {
          method: "DELETE",
          headers: {Authorization:
          `Bearer ${token}`,},
        }
      );

      if (!response.ok) {
        throw new Error("Unable to delete this file.");
      }

      setFiles((previousFiles) =>
        previousFiles.filter(
          (item) => item.id !== file.id
        )
      );
    } catch (err) {
      console.error("Delete file error:", err);
      setError("File could not be deleted. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Open selected document in chat
  const handleOpenFile = (file) => {
    setActiveItem(file.id);

    navigate("/chat", {
      state: {
        fileId: file.id,
        fileName: getFileName(file),
      },
    });
  };

  // Sidebar menu
  const menuItems = [
    {
      name: "Home",
      icon: "⌂",
      action: handleHome,
    },
    {
      name: "My Files",
      icon: "📁",
      action: handleMyFiles,
    },
  ];

  // Search files
  const filteredFiles = files.filter((file) =>
    getFileName(file)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <aside className="flex h-[calc(100vh-72px)] w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Normal Chat Toggle */}
<div className="px-4 py-3 normal">
  <div className="flex items-center justify-between">

    <span className="text-sm font-medium text-slate-700">
      Normal Chat
    </span>

    <button
      type="button"
      onClick={() => {
        if (normalChat){
          setNormalChat(false)
        }else{
          setNormalChat(true)
        }
        
        }}
      className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
        normalChat ? "bg-blue-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
          normalChat ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>

  </div>
</div>

     
      {/* Main navigation */}
      <div className="space-y-2 p-4">

        {menuItems.map((item) => {
          const isActive = activeItem === item.name;

          return (
            <button
              key={item.name}
              onClick={item.action}
              className={`normal flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 font-semibold text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {item.icon}
              </span>

              <span className="flex-1 text-sm">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mx-4 border-t border-slate-200" />

      {/* My Files */}
      <div className="flex min-h-0 flex-1 flex-col p-4">

        <div className="mb-3 flex items-center justify-between normal">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            My Files
          </h2>

          <button
            onClick={fetchFiles}
            disabled={loading}
            title="Refresh files"
            aria-label="Refresh files"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 disabled:opacity-50"
          >
            ↻
          </button>
        </div>

        {/* Search */}
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-blue-400">
          <span className="text-sm text-slate-400">
            ⌕
          </span>

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search your files..."
            className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="text-xs text-slate-400 hover:text-slate-700"
            >
              ×
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-3 rounded-lg bg-red-50 p-3 text-xs text-red-600">
            <p>{error}</p>

            <button
              onClick={fetchFiles}
              className="mt-2 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="space-y-3 py-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex animate-pulse items-center gap-3"
              >
                <div className="h-9 w-9 rounded-lg bg-slate-100" />

                <div className="h-3 flex-1 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : filteredFiles.length > 0 ? (

          /* File list */
          <div className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
            {filteredFiles.map((file) => {
              const fileName = getFileName(file);
              const isActive = activeItem === file.id;
              const isDeleting = deletingId === file.id;

              return (
                <div
                  key={file.id}
                  className={`group flex items-center gap-2 rounded-xl transition ${
                    isActive
                      ? "bg-blue-50"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <button
                    onClick={() => handleOpenFile(file)}
                    title={fileName}
                    className={`flex min-w-0 flex-1 items-center gap-3 rounded-xl px-2 py-2.5 text-left ${
                      isActive
                        ? "text-blue-700"
                        : "text-slate-600"
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-lg group-hover:bg-white">
                      📄
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-medium">
                        {fileName}
                      </span>

                      <span className="mt-1 block text-[10px] text-slate-400">
                        PDF document
                      </span>
                    </span>
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteFile(file)}
                    disabled={isDeleting}
                    title="Delete file"
                    aria-label={`Delete ${fileName}`}
                    className="mr-1 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
                  >
                    {isDeleting ? "…" : <FaTrashAlt/>}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (

          /* Empty state */
          <div className="flex flex-1 flex-col items-center justify-center px-3 py-8 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
              📂
            </div>

            <p className="text-sm font-medium text-slate-700">
              {search
                ? "No matching files"
                : "No files yet"}
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              {search
                ? "Try a different search term."
                : "Upload a document to get started."}
            </p>

            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {!loading && files.length > 0 && (
          <p className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-400">
            {files.length} document
            {files.length !== 1 ? "s" : ""} available
          </p>
        )}
      </div>

      {/* Bottom section */}
      <div className="space-y-1 border-t border-slate-200 p-4">

        {/* Help */}
        <button
          onClick={() => {
            setActiveItem("Help");
            navigate("/help");
          }}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition hover:bg-slate-50 ${
            activeItem === "Help"
              ? "bg-blue-50 text-blue-700"
              : "text-slate-600"
          }`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
            ?
          </span>

          <span>Help & Support</span>
        </button>

        {/* Settings */}
        <button
          onClick={() => {
            setActiveItem("Settings");
           
          }}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition hover:bg-slate-50 ${
            activeItem === "Settings"
              ? "bg-blue-50 text-blue-700"
              : "text-slate-600"
          }`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
            ⚙
          </span>

          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;