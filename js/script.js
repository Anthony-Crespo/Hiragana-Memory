all_choices = document.querySelectorAll('.multiple-choice div')

for(let i=0; i<all_choices.length; i++){
  all_choices[i].addEventListener('click', function (e) {
    if (i == 0) {
      alert('Correct answer!')
    }
    else {
      alert('Wrong answer!')
    }
  });
}
