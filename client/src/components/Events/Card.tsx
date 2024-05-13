import { Link } from "react-router-dom";
import card from "../../assets/cover3.jpg";

const Card = () => {
  return (
    <div className="flex h-[400px] pl-8">
      <div className="flex bg-custom-color1 relative">
        <img
          src={card}
          alt="alternative"
          className="rounded-lg w-full h-full"
        />
        <div className="flex w-full border-4 border-red-500 pr-4 bg-white absolute bottom-0 mb-4 h-auto mx-4 rounded-lg p-4">
        
      </div>
      </div>
    </div>

  //   <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full mt-12 gap-12">
  //         <div
  //           key={id}
  //           className="h-[580px] w-[400px] shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-3 transform transition-transform hover:scale-105 bg-custom-color1 rounded-xl"
  //         >
  //           <div className="rounded-xl overflow-hidden">
  //             {images && images.length > 0 && (
  //               <Link to={`/blog/${id}`}>
  //                 <img
  //                   src={`http://localhost:5000/${post.images[0].url.replace(
  //                     /\\/g,
  //                     "/"
  //                   )}`}
  //                   alt="blogPicture"
  //                   className="w-full object-cover object-center h-64"
  //                 />
  //               </Link>
  //             )}
  //           </div>
  //           <div className="flex flex-col">
  //             <Link to={`/blog/${id}`}>
  //               <h2 className="mt-4 mb-2 font-bold hover:text-custom-color3 text-lg">
  //                 {post.title.length > 30
  //                   ? post.title.substring(0, 30) + "..."
  //                   : post.title}
  //               </h2>
  //             </Link>
  //             <p className="h-[70px] text-custom-color3 mt-3 text-sm md:text-base lg:text-lg">
  //               {post.description.length > 145
  //                 ? post.description.substring(0, 100) + "..."
  //                 : post.description}
  //             </p>
  //             {currentUser && post.username === currentUser.user?.username && (
  //               <div className="flex justify-center gap-5">
  //                 <FaEdit
  //                   onClick={() => handleEditClick(post.id)}
  //                   className="text-custom-color3 hover:text-custom-color2 cursor-pointer"
  //                 />
  //                 <FaTrash
  //                   onClick={() => handleDeleteAccount(post.id)}
  //                   className="text-red-500 hover:text-red-200 cursor-pointer"
  //                 />
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       ))}
  //   </div>
  // );
 );
};

export default Card;
