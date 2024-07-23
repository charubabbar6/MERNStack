/*describe Block: Groups related tests.
beforeEach: Sets up the environment before each test by getting the table element.
it Blocks: Each test is written inside an it block.
*/
describe("Customer Table", function () {
  var table;

  beforeEach(function () {
    table = document.getElementById("customerTable");
  });

  it("should have the table present", function () {
    expect(table).not.toBeNull();
  });

  it("should have four columns in the header", function () {
    var headers = table.querySelectorAll("th");
    expect(headers.length).toBe(4);
    expect(headers[0].textContent.trim()).toBe("Customer Name");
    expect(headers[1].textContent.trim()).toBe("Customer Age");
    expect(headers[2].textContent.trim()).toBe("Customer Gender");
    expect(headers[3].textContent.trim()).toBe("Customer Email Id");
  });

  it("should have correct content in the rows", function () {
    var rows = table.querySelectorAll("tr");

    // Verify the content of the first data row
    expect(rows[1].querySelectorAll("td")[0].textContent.trim()).toBe("Charu");
    expect(rows[1].querySelectorAll("td")[1].textContent.trim()).toBe("39");
    expect(rows[1].querySelectorAll("td")[2].textContent.trim()).toBe("Female");
    expect(rows[1].querySelectorAll("td")[3].textContent.trim()).toBe(
      "er.charu.babbar@gmail.com"
    );

    // Verify the content of the second data row
    expect(rows[2].querySelectorAll("td")[0].textContent.trim()).toBe(
      "Sushant"
    );
    expect(rows[2].querySelectorAll("td")[1].textContent.trim()).toBe("39");
    expect(rows[2].querySelectorAll("td")[2].textContent.trim()).toBe("Male");
    expect(rows[2].querySelectorAll("td")[3].textContent.trim()).toBe(
      "er.sushant.chanana@gmail.com"
    );

    // Verify the content of the third data row
    expect(rows[3].querySelectorAll("td")[0].textContent.trim()).toBe("Arjun");
    expect(rows[3].querySelectorAll("td")[1].textContent.trim()).toBe("3");
    expect(rows[3].querySelectorAll("td")[2].textContent.trim()).toBe("Male");
    expect(rows[3].querySelectorAll("td")[3].textContent.trim()).toBe(
      "arjun21@gmail.com"
    );
  });
});
