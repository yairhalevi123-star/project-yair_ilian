$("#submit").on("click", (e) => {
  e.preventDefault();
  const URLL = $("#URL").val();

  $.ajax({
    url: "/submit",
    type: "POST",
    data: { floatingInput: URLL },
    success: function (data) {
      $("#qrContainer").html(data);
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
});
