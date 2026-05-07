import { Link } from 'react-router-dom';

const PageHeader = ({ title, breadcrumb, bgImage }) => {
  const headerStyle = {
    backgroundColor: '#082e71',
    backgroundImage: bgImage 
      ? `url(/img/bg-dot.png), url(/img/bg-round.png), url(${bgImage})`
      : `url(/img/bg-dot.png), url(/img/bg-round.png), url(/img/bg-bottom-hero.png)`,
    backgroundPosition: '10px 10px, left 55% top -1px, center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto, auto, cover',
    minHeight: '300px'
  };

  return (
    <div className="container-fluid py-5 hero-header mb-5" style={headerStyle}>
      <div className="container my-5 py-5 px-lg-5">
        <div className="row g-5 py-5">
          <div className="col-12 text-center">
            <h1 className="text-white animated zoomIn">
              {title}
            </h1>
            <hr className="bg-white mx-auto mt-0" style={{ width: '90px' }} />
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <Link className="text-white" to="/">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <a className="text-white" href="#">
                    Pages
                  </a>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                  {breadcrumb || title}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
