import { Link } from 'react-router-dom';

const PageHeader = ({ title, breadcrumb, bgImage }) => {
  const headerStyle = {
    backgroundColor: '#082e71',
    backgroundImage: `url(/img/bg-bottom-hero.png), linear-gradient(rgba(8, 46, 113, 0.55), rgba(8, 46, 113, 0.55)), url(${bgImage || '/img/bg-bottom-hero.png'})`,
    backgroundPosition: 'center bottom -1px, center center, center center',
    backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
    backgroundSize: '100% auto, cover, cover',
    minHeight: '350px',
    position: 'relative'
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
