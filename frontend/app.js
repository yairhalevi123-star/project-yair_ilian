$("#submit").on("click", (e) => {
  e.preventDefault();
  const URLL = $("#URL").val();

  $.ajax({
    url: "/submit",
    type: "POST",
    data: { floatingInput: URLL },
    success: function (data) {
      const card = $(`
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <h2 class="card-title ms-5">QR Code</h5>
            <div class="card-text">${data}</div>
          </div>
        </div>
      `);
      $("#qrContainer").append(card);
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
});
