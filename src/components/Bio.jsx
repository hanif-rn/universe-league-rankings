import { useState, useEffect } from "react";
import biodataEN from "../data/biodata.json";
import biodataKR from "../data/biodatatrans.json";

const Bio = ({ name, imgurl }) => {
  const [bio, setBio] = useState(null);
  const [language, setLanguage] = useState("kr");

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "kr" : "en"));
  };

  const findBio = (biodata) => {
    const foundBio = biodata.find((entry) => entry.Name === name);
    setBio(foundBio);
  };

  useEffect(() => {
    const biodata = language === "en" ? biodataEN : biodataKR;
    findBio(biodata);
  }, [language, name]);

  return (
    <div className="w-full">
      <button
        className="btn w-full relative z-10"
        onClick={() => {
          my_modal_3.showModal();
        }}
        onTouchStart={() => {
          my_modal_3.showModal();
        }}
      >
        Biodata
      </button>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-yellow-200">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => my_modal_3.close()}
              onTouchEnd={() => my_modal_3.close()}
            >
              ✕
            </button>
          </form>

          {bio ? (
            <div className="max-w-3xl mx-auto md:p-6">
              <h1 className="text-xl md:text-3xl font-extrabold text-center text-gray-900 mb-6 font-montserrat">
                {bio.Name}
              </h1>
              <div className="bg-white rounded-lg shadow-lg pl-5 py-4 md:p-8">
                <div className="chat chat-start mb-6">
                  <div className="chat-image avatar">
                    <div className="w-14 h-14 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-blue-500">
                      <img
                        alt="Avatar"
                        src={imgurl}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="chat-header md:text-xl font-semibold text-gray-800 font-montserrat">
                    {bio.Name.slice(0, bio.Name.indexOf(" ("))}
                  </div>
                  <div className="chat-bubble text-lg font-montserrat">
                    {bio.Quote || "No quote available"}
                  </div>
                </div>

                {/* Bio Details */}
                <div className="space-y-5">
                  <p className="text-lg font-medium text-gray-800 font-montserrat">
                    <strong className="text-blue-600">Date of Birth:</strong>{" "}
                    {bio.DoB || "N/A"}
                  </p>
                  <p className="text-lg font-medium text-gray-800 font-montserrat">
                    <strong className="text-blue-600">Likes:</strong>{" "}
                    {bio.Likes || "N/A"}
                  </p>
                  <p className="text-lg font-medium text-gray-800 font-montserrat">
                    <strong className="text-blue-600">MBTI:</strong>{" "}
                    {bio.MBTI || "N/A"}
                  </p>
                  <p className="text-lg font-medium text-gray-800 font-montserrat">
                    <strong className="text-blue-600">Nationality:</strong>{" "}
                    {bio.Nationality
                      ? bio.Nationality.split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center mt-4 space-x-2">
                <label
                  htmlFor="language-switch"
                  className="text-gray-700 font-semibold"
                >
                  KR
                </label>
                <input
                  type="checkbox"
                  id="language-switch"
                  className="toggle toggle-primary"
                  checked={language === "kr"}
                  onChange={toggleLanguage}
                  onTouchStart={toggleLanguage}
                />
                <label
                  htmlFor="language-switch"
                  className="text-gray-700 font-semibold"
                >
                  EN
                </label>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default Bio;
