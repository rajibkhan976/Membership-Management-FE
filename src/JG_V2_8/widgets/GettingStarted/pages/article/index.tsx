import { Badge, Button } from '@comps/uiComps'
import ArrowLeft from '@comps/uiComps/Icons/SVG/ArrowLeft'
import FullScreen from '@comps/uiComps/Icons/SVG/FullScreen'
import { ArrowSmLeftIcon } from '@heroicons/react/outline'
import FAQ from '@jg/common/comps/float-helper-button/FAQ'
import 'font-awesome/css/font-awesome.css'
import { capitalize } from 'lodash'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RightSideBar from '../../components/RightSideBar'
import SecondaryNav from '../../components/SecondaryNav'
import useGettingStartedStore from '../../store/useGettingStarted'

const Article = () => {
  const { contentId } = useParams()
  const getContentsByIds = useGettingStartedStore((state) => state.getContentsByIds)
  const articleData = getContentsByIds([Number(contentId)])
  const [toggle, setToggle] = useState(false)
  const navigate = useNavigate()
  return (
    <div className="w-full bg-[#fafafa] flex">
      {articleData &&
        articleData.length > 0 &&
        articleData.map((articleData: any, i: number) => (
          <div key={i} className="w-full flex justify-center flex-col">
            <div className="w-full max-w-[1170px] justify-center mx-auto my-0">
              <img
                className="w-full max-h-[180px] h-full md:max-h-[300px] object-cover flex"
                src={articleData.body.leadImage}
                alt="banner"
              />
              <div
                className="w-full h-14 flex border-jg-metal-50 md:border-0 text-jg-metal-700 md:jg-hidden bg-white"
                onClick={() => navigate(-1)}
              >
                <ArrowSmLeftIcon className="w-7 cursor-pointer mr-3" />
                <p className="text-xl font-semibold leading-6 pt-4">{articleData.category}</p>
              </div>
              <SecondaryNav className="md:flex w-full jg-hidden" title={articleData.category} navigateValue={-1} />

              <div className="flex flex-row gap-x-8 relative mt-4">
                <div className="flex lg:max-w-[770px] w-full flex-col flex-wrap justify-center">
                  <div className="rounded shadow-md mb-4">
                    <div key={i} className="bg-white border-jg-metal-50 pt-4 lg:pt-6 px-4 lg:px-6 ">
                      <Badge
                        label={capitalize(articleData.type)}
                        variant="primary"
                        fillType="faded"
                        className="mb-4 jg-hidden md:inline-block"
                        rounded
                        size="lg"
                      />
                      <div className="mb-6">
                        <div className="flex items-center justify-between ">
                          <div
                            id="Overview"
                            className="text-sm text-zinc-800 not-italic uppercase !text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
                          >
                            {articleData.title}
                          </div>
                        </div>
                        <hr className="w-8 mt-1 my-2 border-t-2 border-jg-green-500 mb-6"></hr>

                        {/* introText */}
                        {articleData.body.introText && (
                          <p className="text-jg-metal-500 text-sm mb-4">{articleData.body.introText}</p>
                        )}

                        {/* Video view */}
                        {articleData.type === 'Video' && articleData.body.videoLink && (
                          <div className="mb-4">
                            <iframe
                              width="100%"
                              height="345"
                              src={`https://www.youtube-nocookie.com/embed/${articleData.body.videoLink}`}
                            ></iframe>
                          </div>
                        )}

                        {/* pdf view */}
                        {articleData.type === 'User Guide' && articleData.body.pdfLink && (
                          <>
                            {toggle && (
                              <div className="fixed top-0 left-0 w-full h-full z-20 flex justify-end">
                                <iframe
                                  className="h-full w-full"
                                  // ref={iframe}
                                  src={articleData.body.pdfLink}
                                ></iframe>
                                <Button
                                  btnColor="primary"
                                  btnSize="xs"
                                  fillType="solid"
                                  text={<ArrowLeft />}
                                  iconPosition="left"
                                  className="absolute md:top-16 top-2 left-4 w-10 hover:scale-110 scale-100 transition duration-300 h-10 !p-0 !text-2xl !rounded-full flex items-center justify-center"
                                  onClick={() => {
                                    setToggle(!toggle)
                                  }}
                                />
                              </div>
                            )}

                            <div className="relative mb-4 pr-2 pt-3 ">
                              <iframe
                                className=" md:h-[400px] 600px w-full border-b-4 border-[#525659]"
                                src={articleData.body.pdfLink}
                              />

                              <div className="absolute bottom-5 right-10">
                                <Button
                                  btnColor="primary"
                                  btnSize="xs"
                                  fillType="solid"
                                  text={<FullScreen />}
                                  iconPosition="left"
                                  className="w-10 hover:scale-110 scale-100 transition duration-300 h-10 !p-0 !text-2xl !rounded-full flex items-center justify-center"
                                  onClick={() => {
                                    setToggle(!toggle)
                                  }}
                                />
                              </div>
                            </div>
                          </>
                        )}

                        {/* article view */}
                        {articleData.type === 'Article' && articleData.body.articleBody && (
                          <>
                            {articleData.body.articleBody &&
                              articleData.body.articleBody.length > 0 &&
                              articleData.body.articleBody.map((article: any) => (
                                <p className="text-jg-metal-500 text-sm mb-4">{article}</p>
                              ))}
                          </>
                        )}
                      </div>

                      {/* FAQ  */}
                      {articleData.type === 'FAQ' && articleData.body.faqBody && articleData.body.faqBody && (
                        <div className="mb-4">
                          <FAQ faqs={articleData.body.faqBody} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pb-4"></div>
                </div>
                <RightSideBar />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Article
