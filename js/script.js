const ALL_HIRAGANA = {
  'a': 'あ',
  'i': 'い',
  'u': 'う',
  'e': 'え',
  'o': 'お',

  'ka': 'か',
  'ki': 'き',
  'ku': 'く',
  'ke': 'け',
  'ko': 'こ',
}
const ALL_ROMAJI = [
  'a', 'i', 'u', 'e', 'o',
  'ka', 'ki', 'ku', 'ke', 'ko'
]
let all_choices = document.querySelectorAll('.multiple-choice div')
let current_hiragana = document.querySelector('.hiragana span')
const random_character = ()=> ALL_ROMAJI[Math.floor(Math.random() * ALL_ROMAJI.length)]
const bg_color = (from,to) => {
  page = document.querySelector('html')
  page.style.backgroundColor  = from;
  setTimeout(() => page.style.backgroundColor  = to, 500);
}

for(let i=0; i<all_choices.length; i++){
  all_choices[i].addEventListener('click', function (e) {
    if (ALL_HIRAGANA[e.target.textContent] === current_hiragana.textContent) {
      bg_color('#36AA48', '#DE4F41')
    }
    else {
      bg_color('#E8DF00', '#DE4F41')
      return
    }
    // get random hiragana and display it
    do {
      var random = random_character()
    } while (ALL_HIRAGANA[random] === current_hiragana.textContent)
    current_hiragana.textContent = ALL_HIRAGANA[random]
    // get romaji of current hiragana and two other random
    let random_romaji = [random]
    while (random_romaji.length !== 3) {
      let unused_romaji = random_character()
      if (!random_romaji.includes(unused_romaji)) {
        random_romaji.push(unused_romaji)
      }
    }
    // replace the current romaji choices randomly with new 3
    romaji_choices = document.querySelectorAll('.multiple-choice div span')
    for (let choice of romaji_choices) {
      let index = Math.floor(Math.random() * random_romaji.length)
      choice.textContent = random_romaji[index]
      random_romaji.splice(index, 1)
    }
  });
}
