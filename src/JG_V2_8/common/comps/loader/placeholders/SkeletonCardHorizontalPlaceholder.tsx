function SkeletonCardHorizontalPlaceholder() {
  const count: number[] = [1, 2, 3]
  return (
    <div
      role="status"
      className=" space-y-4 max-w-md    divide-y divide-gray-200 animate-pulse dark:divide-gray-700 dark:border-gray-700"
    >
      {count.map((i, index) => {
        return (
          <div key={index} className="pt-4 block ">
            <div className="flex flex-col sm:flex-row max-w-[320px] sm:max-w-none items-start sm:items-center sm:justify-start mx-auto sm:mx-0 overflow-hidden">
              <div className="relative w-full max-w-[320px] sm:w-[220px] sm:h-[110px] flex-shrink-0">
                <div className="aspect-w-2 aspect-h-1">
                  <svg
                    className="object-cover w-full h-full text-gray-200 dark:text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 640 512"
                  >
                    <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                  </svg>
                </div>
              </div>
              <div className="my-2 sm:my-0 sm:w-auto">
                <div className="sm:px-4 px-0">
                  <div className="flex items-center space-x-3 undefined">
                    <svg
                      className=" text-gray-200 dark:text-gray-600 inline-block overflow-hidden object-cover h-8 w-8 rounded-full ring-2 ring-white"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 640 512"
                    >
                      <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                    </svg>
                    <div className="space-y-1">
                      <h4 className="font-inter text-sm leading-4 text-jg-metal-800 font-medium truncate undefined h-2 bg-jg-grey-200 rounded-full dark:bg-gray-700 w-32 mb-2"></h4>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col sm:px-4 py-1 gap-1 px-0">
                  <span className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-2"></span>
                  <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                  <div className="truncate h-2 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                </div>
                <div className="flex justify-between sm:pl-4 pl-0">
                  <div className="flex items-center space-x-1">
                    <svg
                      width="14"
                      height="20"
                      viewBox="0 0 14 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-jg-grey-200"
                    >
                      <path
                        d="M7 4.5C7.66304 4.5 8.29893 4.76339 8.76777 5.23223C9.23661 5.70107 9.5 6.33696 9.5 7C9.5 7.3283 9.43534 7.65339 9.3097 7.95671C9.18406 8.26002 8.99991 8.53562 8.76777 8.76777C8.53562 8.99991 8.26002 9.18406 7.95671 9.3097C7.6534 9.43534 7.32831 9.5 7 9.5C6.33696 9.5 5.70107 9.23661 5.23223 8.76777C4.76339 8.29893 4.5 7.66304 4.5 7C4.5 6.33696 4.76339 5.70107 5.23223 5.23223C5.70107 4.76339 6.33696 4.5 7 4.5ZM7 0C8.85652 0 10.637 0.737498 11.9497 2.05025C13.2625 3.36301 14 5.14348 14 7C14 12.25 7 20 7 20C7 20 0 12.25 0 7C0 5.14348 0.737498 3.36301 2.05025 2.05025C3.36301 0.737498 5.14349 0 7 0ZM7 2C5.67392 2 4.40215 2.52678 3.46447 3.46447C2.52678 4.40215 2 5.67392 2 7C2 8 2 10 7 16.71C12 10 12 8 12 7C12 5.67392 11.4732 4.40215 10.5355 3.46447C9.59785 2.52678 8.32608 2 7 2Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="text-[13px] leading-4 text-jg-metal-700 font-medium truncate h-2 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-2"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default SkeletonCardHorizontalPlaceholder
