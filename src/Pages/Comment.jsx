import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { deleteComment, updateComment } from "../Api/FireStoreApi";
import Swal from "sweetalert2";
import user from "../../img/user.png";
import { useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "antd";
import { useInView } from "react-intersection-observer";



const Comment = ({ comment, ifAdmin, currentUser,setReply,setComment, reply }) => {

    const [editComment, setEditComment] = useState(comment?.comment)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAdmin = comment?.email ==  "waiminhein@gmail.com"

  const adminName = " (Admin)"
  const userName = " (User)"

  const commentChildRef = useRef()

 



    const commentId = comment?.id


    const commentEditFunction = () => {

        const editedComment = {
          ...comment,
          id:commentId,
          comment:editComment,
        }
        updateComment(commentId, editedComment)
        setIsModalOpen(false)
      
      
      }

      const commentSectionRef = useRef(null);
      const [hasBeenSeen, setHasBeenSeen] = useState(false);



  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ifAdmin? setHasBeenSeen(true): setHasBeenSeen(false);
          observer.unobserve(entry.target);
        }
      });
    });

    if (commentSectionRef.current) {
      observer.observe(commentSectionRef.current);
    }

    return () => {
      if (commentSectionRef.current) {
        observer.unobserve(commentSectionRef.current);
      }
    };
  }, []);

  useMemo(() => {
    hasBeenSeen && 
    
    updateComment(commentId, {...comment, seen:true})
  }, [hasBeenSeen])


      
    




  const isCommentWriter = comment?.userId == currentUser?.userId;
  const postId = comment?.id;

  const swalWithButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-btn text-white px-3 py-2 rounded-md text-xl ml-3 mx-3",
      cancelButton: "bg-red-500 text-white px-3 py-2 rounded-md text-xl",
    },
    buttonsStyling: false,
  });

  const delComment = () => {
    swalWithButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteComment(postId);

          swalWithButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };



  return (
    <div ref={commentSectionRef}  className="mt-5 bg-[#ADB5BD] px-4 py-3 rounded-md text-[#111122]">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <img
            src={comment?.profileUrl ? comment?.profileUrl : user}
            className="w-[1rem] h-[1rem] rounded-full"
            alt=""
          />
          <div className="flex items-center justify-start ">
          <h4 ref={commentChildRef} className=" mx-2">{comment?.name}</h4>
          <span>{isAdmin?adminName:userName}</span>

          </div>
        </div>
        <p className="">{comment?.time}</p>
      </div>
      <div className="mt-4">
        <p className="">{comment?.comment}</p>
      </div>

      <div className="flex justify-end items-center mt-3">
        <button className="px-5 text-primary" onClick={() => (setReply(commentChildRef.current.innerText), setComment(`${commentChildRef.current.innerText}, `))}>Reply</button>
        <button
          className={isCommentWriter || ifAdmin ? "text-2xl" : "hidden"}
          onClick={delComment}
        >
          <MdDelete />
        </button>
        <button
          className={isCommentWriter ? "text-xl pl-6" : "hidden"}
          onClick={showModal}
        >
          <MdEdit />
        </button>

        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className="w-[75%] grid"
          footer={[]}
        >
          <form className="flex items-center mt-8">
            <input
              type="text"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
              
              placeholder="Edit Comment"
              className="border border-1 border-btn-text rounded-full px-5 py-2 focus:outline-none w-[80%] inline-block mx-4"
              autoFocus
            />
            <button
              type="submit"
              className="bg-btn px-3 py-2 rounded-lg text-white inline-block ml-5"
              onClick={(e) => {
                e.preventDefault();
                editComment.length > 0 && commentEditFunction();
              }}
            >
              Update
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Comment;
