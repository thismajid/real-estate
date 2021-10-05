$(document).ready(() => {
  $("#userManagement").click(() => {
    $.ajax({
      type: "get",
      url: "/admin/users",
      success: function (data) {
        // let table = `<table class="table"><thead><tr><th>#</th><th>نام</th><th>نام خانوادگی</th><th>نام کاربری</th><th>آدرس ایمیل</th><th>شماره موبایل</th><th>نقش</th></tr></thead></table>`;
        // let tbody;
        // let tr;
        // for (let index = 0; index < data.users.length; index++) {
        //   tr += `<td>${index + 1}</td>`;
        //   tr += `<td>${data.users[index].firstName}</td>`;
        //   tr += `<td>${data.users[index].lastName}</td>`;
        //   tr += `<td>${data.users[index].username}</td>`;
        //   tr += `<td>${data.users[index].email}</td>`;
        //   tr += `<td>${data.users[index].mobileNumber}</td>`;
        //   tr += `<td>${data.users[index].role}</td>`;
        // }
        // tbody += tr;
        // table += tbody;
        // $("#adminMainContainer").html(`${table}`);
        //     <table class="table">
        //     <thead>
        //       <tr>
        //         <th scope="col">#</th>
        //         <th scope="col">First</th>
        //         <th scope="col">Last</th>
        //         <th scope="col">Handle</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       <tr>
        //         <th scope="row">1</th>
        //         <td>Mark</td>
        //         <td>Otto</td>
        //         <td>@mdo</td>
        //       </tr>
        //     </tbody>
        //   </table>
      },
    });
    // $("#adminMainContainer").html(`<p>121212121</p>`);
  });
});
