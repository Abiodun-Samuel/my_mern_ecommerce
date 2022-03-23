import swal from "@sweetalert/with-react";

export const customSweetAlert = (title, text, icon, btn_text, onSuccess) => {
  swal(title, text, icon, {
    button: "close",
    content: (
      <div className="d-flex justify-content-center">
        <button className="btn_one" onClick={onSuccess}>
          {btn_text}
        </button>
      </div>
    ),
  });
};

// export const deleteSwal = (
//   title,
//   icon,
//   dangerMode,
//   dispatch,
//   deleteProduct,
//   id
// ) => {
//   swal({
//     title,
//     //  text: "Once deleted, you will not be able to recover this imaginary file!",
//     icon: icon,
//     buttons: true,
//     dangerMode: false,
//   }).then((willDelete) => {
//     if (willDelete) {
//       swal("Poof! Your imaginary file has been deleted!", {
//         icon: "success",
//       });
//       dispatch(deleteProduct(id));
//       // console.log(true);
//       // dispatch(deleteProduct(id));
//     } else {
//       swal("Your imaginary file is safe!");
//     }
//   });
// };
