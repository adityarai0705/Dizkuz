import React from "react";
import UserCard from "./UserCard";
import Aditya2 from "./StaticRES/adityayadav.png";
import Aishwarya from "./StaticRES/aishwarya.png";
import Aryan from "./StaticRES/aryan.png";
import Shreyansh from "./StaticRES/shreyansh.png";

export default function Creaters() {
     return (
          <div style={{ padding: "20px" }}>
               <h2 style={{ color: "darkcyan" }}>Creators</h2>
               <div className="UserCardOuterContainer">
                    <div className="UserCardContainer">
                         <UserCard
                              name={"Shreyansh Saurabh"}
                              branch={"Chemical Engineering"}
                              image={Shreyansh}
                              gitLink={"https://github.com/dwargosama"}
                         />
                         <UserCard
                              name={"Aishwarya Vikram Singh"}
                              branch={"Computer Science & Engineering"}
                              image={Aishwarya}
                              gitLink={
                                   "https://github.com/Aishwaryavikramsingh"
                              }
                         />
                         <UserCard
                              name={"Aryan Singh"}
                              branch={"Electronics & Communication Engineering"}
                              image={Aryan}
                              gitLink={"https://github.com/aarryyan"}
                         />
                         <UserCard
                              name={"Aditya Singh Yadav"}
                              branch={"Computer Science & Engineering"}
                              image={Aditya2}
                              gitLink={"https://github.com/aditya-mnnit"}
                         />
                    </div>
               </div>
          </div>
     );
}
