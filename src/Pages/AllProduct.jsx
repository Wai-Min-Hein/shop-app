import React, { useContext, useEffect, useMemo, useState } from "react";
import { StateContext } from "../Context/Context";
import NavBar from "./NavBar";
import AllProductComponent from "../Components/AllProductComponent";
import { getAllComment } from "../Api/FireStoreApi";

const AllProduct = () => {
  const { allProductToRender, search } = useContext(StateContext);

  const filterItems = search
    ? allProductToRender?.filter(
        (product) =>
          product?.title.toLowerCase().includes(search) ||
          product?.description.toLowerCase().includes(search)
      )
    : [];

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(filterItems);
  }, [search]);

  const [allComment, setAllComment] = useState([]);

  useMemo(() => {
    getAllComment(setAllComment);
  }, []);

  const filterComment = allComment?.filter((comment) => comment.seen == false);


  return (
    <div className="container mx-auto">
      {/* <NavBar /> */}

      <div className=" flex flex-wrap gap-5 justify-start items-stretch mt-10">
        {search === "" ? (
          allProductToRender?.map((product) => {
            const filterCommentByProduct = filterComment?.filter(comment => comment.postId == product?.id);
          
            return (
              <React.Fragment key={product?.id}>
                <AllProductComponent product={product} filterCommentByProduct={filterCommentByProduct}/>
                {/* You can use the filterCommentByProduct variable here */}
                {/* ... */}
              </React.Fragment>
            );
          })
        ) : items?.length <= 0 ? (
          <h1 className="text-head text-3xl font-para mt-24">
            No Products found
          </h1>
        ) : (
          items?.map((product) => {
            const filterCommentByProduct = filterComment?.filter(comment => comment.postId == product?.id);
          
            return (
              <React.Fragment key={product?.id}>
                <AllProductComponent product={product} filterCommentByProduct={filterCommentByProduct}/>
                {/* You can use the filterCommentByProduct variable here */}
                {/* ... */}
              </React.Fragment>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllProduct;
