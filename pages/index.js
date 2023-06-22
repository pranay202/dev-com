import React from 'react';
const Home = (props) => {
  return (
    <div className='relative overflow-hidden'>
      <main>
        <div className='pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden'>
          <div className='container mx-auto max-w-7xl lg:px-8'>
            <div className='row lg:gap-8'>
              <div className='mx-auto col-md-8 col-lg-6 col-xl-6 px-4 sm:text-center'>
                <div className='py-5'>
                  <a
                    href='/products'
                    className='inline-flex items-center text-white bg-dark rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200'
                  >
                    <span className='px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-primary rounded-full'>
                      Products
                    </span>
                    <span className='ml-4 text-sm'>
                      Visit our products page
                    </span>
                  </a>
                  <h1 className='mt-4 mb-6 text-4xl tracking-tight font-weight-bold text-dark sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl'>
                    <span className='d-block'>A better way to</span>
                    <span className='d-block text-primary'>sell your code</span>
                  </h1>
                  <p className='mb-6 text-lg text-dark sm:mt-5 sm:text-xl lg:text-lg xl:text-xl'>
                    Request a free sell of your code for better customers reach!
                  </p>
                  <div className='mt-6'>
                    <form
                      action='https://api.web3forms.com/submit'
                      className='max-w-xl mx-auto'
                      method='POST'
                    >
                      <input
                        type='hidden'
                        name='access_key'
                        value='846f30ee-6a6e-4e69-968d-ec744aba982e'
                      />
                      <div className='row'>
                        <div className='col-sm-9'>
                          <label htmlFor='email' className='sr-only'>
                            Email address
                          </label>
                          <input
                            id='email'
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            className='form-control px-4 py-3 rounded-md border-4 text-base text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-dark'
                          />
                        </div>
                        <div className='col-sm-3 mt-3 mt-md-0'>
                          <button
                            type='submit'
                            style={{ width: '100%' }}
                            className='w-full py-1 rounded-lg btn-block shadow bg-primary text-white font-weight-medium hover:bg-primary-dark'
                          >
                            Request a Sell
                          </button>
                        </div>
                      </div>
                      <p className='mt-3 text-sm text-muted'>
                        Start selling your code with 1 free trial. By providing
                        your email, you agree to our{' '}
                        <a href='#' className='font-weight-medium text-white'>
                          terms of service
                        </a>
                        .
                      </p>
                    </form>
                  </div>
                </div>
              </div>
              <div className='container-sm mx-auto px-4'>
                <div className='py-12 position-relative mt-12 py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-50'>
                  {/* <div className='d-none d-sm-block'>
                    <div className='position-absolute inset-y-0 left-50 w-100 bg-gray-50 rounded-start-3xl lg:left-80 lg:right-0 lg:w-100' />
                    <svg
                      className='position-absolute me-3 lg:m-0 lg:left-0'
                      width={404}
                      height={392}
                      fill='none'
                      viewBox='0 0 404 392'
                    >
                      <defs>
                        <pattern
                          id='837c3e70-6c3a-44e6-8854-cc48c737b659'
                          x={0}
                          y={0}
                          width={20}
                          height={20}
                          patternUnits='userSpaceOnUse'
                        >
                          <rect
                            x={0}
                            y={0}
                            width={4}
                            height={4}
                            className='text-gray-200'
                            fill='currentColor'
                          />
                        </pattern>
                      </defs>
                      <rect
                        width={404}
                        height={392}
                        fill='url(#837c3e70-6c3a-44e6-8854-cc48c737b659)'
                      />
                    </svg>
                  </div> */}
                  <div className='position-relative pl-4 me-40 mx-auto px-0 lg:h-100 lg:pl-12'>
                    <img
                      className='w-100 rounded-md shadow-lg border ring-1 ring-dark ring-opacity-5 lg:h-100'
                      src='https://tailwindui.com/img/component-images/top-nav-with-multi-column-layout-screenshot.jpg'
                      alt=''
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More main page content here... */}
      </main>
    </div>
  );
};

export default Home;
