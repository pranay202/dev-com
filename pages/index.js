import React from 'react';
const Home = (props) => {
  return (
    <div className='relative overflow-hidden'>
      <main>
        <div className='pt-10 bg-light sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden'>
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
                  <h1 className='mt-4 mb-6 text-4xl tracking-tight font-weight-bold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl'>
                    <span className='d-block'>A better way to</span>
                    <span className='d-block text-primary'>ship your code</span>
                  </h1>
                  <p className='mb-6 text-lg text-light sm:mt-5 sm:text-xl lg:text-lg xl:text-xl'>
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
                            className='form-control px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-dark'
                          />
                        </div>
                        <div className='col-sm-3'>
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
              <div className='mt-5 col-lg-6'>
                <div className='mx-auto max-w-md px-4'>
                  {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                  <img
                    className='w-full'
                    src='https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg'
                    alt=''
                  />
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
