import './Error.css';

const Error = () => {
  return (
    <div className="Error">
        <h2>404</h2>
        <h3>We couldn't find that page :(</h3>
        <span>Go to the homepage <a href="/home">here</a>.</span>
    </div>
  )
}

export default Error