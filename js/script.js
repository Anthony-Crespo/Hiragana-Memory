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

  'sa': 'さ',
  'shi': 'し',
  'su': 'す',
  'se': 'せ',
  'so': 'そ',

  'ta': 'た',
  'chi': 'ち', 
  'tsu': 'つ', 
  'te': 'て', 
  'to': 'と',

  'na': 'な',
  'ni': 'に',
  'nu': 'ぬ',
  'ne': 'ね',
  'no': 'の',

  'ha': 'は', 
  'hi': 'ひ', 
  'fu': 'ふ', 
  'he': 'へ', 
  'ho': 'ほ',

  'ma': 'ま', 
  'mi': 'み', 
  'mu': 'む', 
  'me': 'め', 
  'mo': 'も', 

  'ya': 'や', 
  'yu': 'ゆ', 
  'yo': 'よ', 

  'ra': 'ら', 
  'ri': 'り', 
  'ru': 'る', 
  're': 'れ', 
  'ro': 'ろ', 

  'wa': 'わ', 
  'wo': 'を', 

  'n': 'ん'
}
const ALL_ROMAJI = [
  'a', 'i', 'u', 'e', 'o',
  'ka', 'ki', 'ku', 'ke', 'ko',
  'sa', 'shi', 'su', 'se', 'so',
  'ta', 'chi', 'tsu', 'te', 'to',
  'na', 'ni', 'nu', 'ne', 'no',
  'ha', 'hi', 'fu', 'he', 'ho',
  'ma', 'mi', 'mu', 'me', 'mo',
  'ya', 'yu', 'yo',
  'ra', 'ri', 'ru', 're', 'ro',
  'wa', 'wo',
  'n'
]
let all_choices = document.querySelectorAll('.multiple-choice div')
let current_hiragana = document.querySelector('.hiragana span')
const random_character = () => ALL_ROMAJI[Math.floor(Math.random() * ALL_ROMAJI.length)]
const bg_color = (from,to) => {
  page = document.querySelector('html')
  page.style.backgroundColor  = from;
  setTimeout(() => page.style.backgroundColor  = to, 500);
}
const alert_wrong_answer = (romaji, hiragana) => document.querySelector('.alert span')
  .textContent = `"${romaji}" hiragana is ${hiragana}`
let display_char = ['', 'a', 'ko']
let streak = 0

for(let i=0; i<all_choices.length; i++){
  all_choices[i].addEventListener('click', function (e) {
    if (ALL_HIRAGANA[e.target.textContent] === current_hiragana.textContent) {
      bg_color('#36AA48', '#DE4F41')
      document.querySelector('.alert').style.display = 'none'
      streak++
    }
    else {
      bg_color('#FCEB22', '#DE4F41')
      alert_wrong_answer(e.target.textContent, ALL_HIRAGANA[e.target.textContent])
      document.querySelector('.alert').style.display = 'block'
      console.log('Ending streak of: ' + streak)
      streak = 0
      return
    }
    // generate next preview (random)
    setTimeout(() => {
      display_char.shift()
      do {
        display_char.push(random_character())
        if (display_char[1] === display_char[2]) {
          display_char.pop()
        }
      } while (display_char.length !== 3)
      // display next char
      current_hiragana.textContent = ALL_HIRAGANA[display_char[1]]
      // get romaji of current hiragana and two other random
      let random_romaji = [display_char[1]]
      while (random_romaji.length !== 3) {
        let unused_romaji = random_character()
        if (!random_romaji.includes(unused_romaji)) {
          random_romaji.push(unused_romaji)
        }
      }
      // replace the 3 current romaji choices randomly
      romaji_choices = document.querySelectorAll('.multiple-choice div span')
      for (let choice of romaji_choices) {
        let index = Math.floor(Math.random() * random_romaji.length)
        choice.textContent = random_romaji[index]
        random_romaji.splice(index, 1)
      // update preview
      preview_spans = document.querySelectorAll('.preview span')
      preview_spans[0].textContent = ALL_HIRAGANA[display_char[0]]
      preview_spans[1].textContent = ALL_HIRAGANA[display_char[2]]
      }
    }, 501)
  });
}
