const intro = {
  header: 'Intro',
  subHeader: 'Selfsustainable architecture',
  description: 'Sustainable architecture seeks the ways to minimize the negative environmental impact of buildings by efficiency and moderation in the use of materials...',
  slideNumber: 1,
  imageLeft: 'introleft',
  imageRight: 'introright'
}

const benefit = {
  header: 'Benefit',
  subHeader: 'Self-suficient means freedom',
  description: 'Sustainable architecture seeks the ways to minimize the negative environmental impact of buildings by efficiency and moderation in the use of materials...',
  slideNumber: 2,
  imageLeft: 'benefitleft',
  imageRight: 'benefitright'

}
const people = {
  header: 'People',
  subHeader: 'The ones who inspire',
  description: 'Sustainable architecture seeks the ways to minimize the negative environmental impact of buildings by efficiency and moderation in the use of materials...',
  slideNumber: 3,
  imageLeft: 'peopleleft',
  imageRight: 'peopleright'

}
const start = {
  header: 'Start',
  subHeader: 'The ones who inspire',
  description: 'Sustainable architecture seeks the ways to minimize the negative environmental impact of buildings by efficiency and moderation in the use of materials...',
  slideNumber: 4,
  imageLeft: 'startleft',
  imageRight: 'startright'
}


const slides = {intro, benefit, people, start};

export default function storeSlides (state = slides) {
  return state
}
