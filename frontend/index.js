$("#submit").on("click", (e) => {
  e.preventDefault();
  const URLL = $("#URL").val();

  $.ajax({
    url: "/submit",
    type: "POST",
    data: { floatingInput: URLL },
    success: function (response) {
      console.log("Success:", response);
      $("#qrContainer").html(response);
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
});
