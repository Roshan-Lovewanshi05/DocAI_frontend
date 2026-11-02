import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({name,email}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <header className="h-18 w-full border-b border-slate-200 bg-white px-6 flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center text-white text-xl">
          📄
        </div>

        <h1 className="text-2xl font-bold text-slate-800">
          Doc<span className="text-blue-500">AI</span>
        </h1>
      </div>


      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Theme Button */}
        <button
          className="h-10 w-10 rounded-full hover:bg-slate-100
                     flex items-center justify-center text-lg"
          title="Theme"
        >
          ☀️
        </button>


        {/* Notification */}
        <button
          className="h-10 w-10 rounded-full hover:bg-slate-100
                     flex items-center justify-center text-lg"
          title="Notifications"
        >
          🔔
        </button>


        {/* Profile */}
        <div className="relative">

          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5
                       hover:bg-slate-100 transition"
          >

            {/* Profile Image */}
            <div className="h-9 w-9 rounded-full bg-blue-500
                            flex items-center justify-center
                            text-white font-semibold">
               {name.charAt(0).toUpperCase()}
            </div>

            <span className="font-medium text-slate-700">
              {name}
            </span>

            <span className="text-slate-500 text-sm">
              {isProfileOpen ? "▲" : "▼"}
            </span>

          </button>


          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div
              className="absolute right-0 top-14 z-50 w-64
                         rounded-xl border border-slate-200
                         bg-white shadow-lg overflow-hidden"
            >

              {/* User Info */}
              <div className="px-4 py-4 border-b border-slate-100">

                <div className="flex items-center gap-3">

                  <div
                    className="h-11 w-11 rounded-full bg-blue-500
                               flex items-center justify-center
                               text-white font-semibold"
                  >
                    {name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      {name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {email}
                    </p>
                  </div>

                </div>

              </div>

              {/* Logout */}
              <div className="border-t border-slate-100 p-2">

                <button onClick={() =>{ 
                  localStorage.removeItem("token")
                   

                  navigate("/")

                }}
                  className="w-full flex items-center gap-3
                             px-3 py-2.5 rounded-lg
                             hover:bg-red-50 text-red-500"
                >
                  🚪
                  <span>Logout</span>
                </button>

              </div>
              <div className="border-t border-slate-100 p-2">

                <button onClick={() =>{ 
                  console.log("nfndknkd")
                  
                  navigate("/delete-account")

                }}
                  className="w-full flex items-center gap-3
                             px-3 py-2.5 rounded-lg
                             hover:bg-red-50 text-red-500"
                >
                  🚪
                  <span>Delete Account</span>
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  );
};

export default ChatHeader;

