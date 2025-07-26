import PropTypes from 'prop-types'
import clsx from 'clsx'
export default function Subtitle ({text}) {
  return (
    <div className="flex flex-col items-center mt-20 mb-10">
      <h2 className={clsx(
        "text-4xl",
        "text-center",
        "uppercase",
        "pb-5",
        "relative"
        )}>
        {text}
        <span className={clsx(
          "absolute",
          "bottom-0",
          "left-0",
          "md:left-0",
          "left-1/2",
          "md:transform-none",
          "transform",
          "-translate-x-1/2",
          "w-3/4",
          "h-0.5",
          "bg-red"
        )}></span>
      </h2>
    </div>
  )
}

Subtitle.propTypes = {
  text: PropTypes.string.isRequired,
}