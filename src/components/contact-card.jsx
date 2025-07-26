import PropTypes from 'prop-types'

export default function ContactCard ({svgPath, link="", text}) {
  return (
    <div className="link flex items-center justify-start my-3">
      <svg 
        viewBox="0 0 24 24" 
        className='w-5 fill-white'
      >
        {svgPath}
      </svg>
      {
        link 
        ? 
        <a href={link} className='ms-5 text-white text-md hover:text-red' target='_blank'>{text}</a> 
        : 
        <p className='ms-5 text-white text-md'>{text}</p>
      }
    </div>
  )
}

ContactCard.propTypes = {
  svgPath: PropTypes.element.isRequired,
  link: PropTypes.string,
  text: PropTypes.string.isRequired,
}