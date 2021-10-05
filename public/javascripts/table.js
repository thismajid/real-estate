$(document).ready(function () {
  // Activate tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // Filter table rows based on searched term
  $("#search").on("keyup", function () {
    let term = $(this).val().toLowerCase();
    $("table tbody tr").each(function () {
      $row = $(this);
      let firstName = $row.find("td:nth-child(2)").text();
      let lastName = $row.find("td:nth-child(3)").text();
      let username = $row.find("td:nth-child(4)").text();
      let email = $row.find("td:nth-child(5)").text();
      let mobileNumber = $row.find("td:nth-child(6)").text();
      let role = $row.find("td:nth-child(7)").text();
      console.log(term);
      console.log(
        term,
        lastName,
        firstName.search(term),
        lastName.search(term),
        username.search(term),
        email.search(term),
        mobileNumber.search(term),
        role.search(term)
      );
      if (
        firstName.search(term) < 0 &&
        lastName.search(term) < 0 &&
        username.search(term) < 0 &&
        email.search(term) < 0 &&
        mobileNumber.search(term) < 0 &&
        role.search(term) < 0
      ) {
        $row.hide();
      } else {
        $row.show();
      }
    });
  });
});
