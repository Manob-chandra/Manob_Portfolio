fetch("assets/experience_academic_bio/experience_academic_bio.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("content-area").innerHTML = data;
  })
  .catch(error => {
    document.getElementById("content-area").innerHTML = "<p>Content load hoyni.</p>";
    console.error("Error:", error);
  });
