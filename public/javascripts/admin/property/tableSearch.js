$(document).ready(function () {
  // Activate tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // Filter table rows based on searched term
  $("#search").on("keyup", function () {
    let term = $(this).val().toLowerCase();
    $("table tbody tr").each(function () {
      $row = $(this);
      let name = $row.find("td:nth-child(2)").text();
      let description = $row.find("td:nth-child(3)").text();
      if (name.search(term) < 0 && description.search(term) < 0) {
        $row.hide();
      } else {
        $row.show();
      }
    });
  });
});
