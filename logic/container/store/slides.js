const intro = {
  header: 'Intro',
  subHeader: 'Selfsustainable architecture',
  description: 'Sustainable architecture seeks the ways to minimize the negative environmental impact of buildings by efficiency and moderation in the use of materials...',
  slideNumber: 1,
  imageUpper: 'introUpper',
  imageMain: 'introMain'
}

const benefit = {
  header: 'Benefit',
  subHeader: 'Self-suficient means freedom',
  description: 'The whole purpose behind sustainable building is to preserve our environment and avoid the depletion of the earth’s natural resources...',
  slideNumber: 2,
  imageUpper: 'benefitUpper',
  imageMain: 'benefitMain'
}



const people = {
  header: 'People',
  subHeader: 'The ones who inspire',
  description: 'The future 7 billion people all deserve good and sustainable housing, water and energy. Work with new technologies to use the power of nature in the most direct way...',
  slideNumber: 3,
  imageUpper: 'peopleUpper',
  imageMain: 'peopleMain'

}
const start = {
  header: 'Start',
  subHeader: 'Building for the future',
  description: 'Numerous passive architectural strategies have been developed over time. Examples of such strategies include the arrangement of rooms or the sizing and orientation...',
  slideNumber: 4,
  imageUpper: 'startUpper',
  imageMain: 'startMain'

}


const slides = {intro, benefit, people, start};

export default function storeSlides (state = slides) {
  return state
}
