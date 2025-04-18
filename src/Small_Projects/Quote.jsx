import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Quote = () => {

  const [fakeData, setFakeData] = useState([])
  const [random, setRandom] = useState(0)
  const [second, setSecond] = useState(0)
  let count = fakeData.length


  useEffect(() => {
    axios.get('./data.json')
      .then(res => {
        setFakeData(res.data.quotes)
      })
      .catch((err) => {
        console.log('Error loading data', err);
      })
  }, [])

  useEffect(() => {
    if (fakeData.length > 0) {
      setSecond(10)
      const interval = setInterval(() => {
        setSecond(prev => {
          if (prev === 0) {
            // Using normal JS because state initial in Zero that's why
            let count = fakeData.length
            const random = Math.floor(Math.random() * count)
            setRandom(random)
            return 10
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [fakeData])



  // console.log(fakeData);
  // console.log(random);

  return (
    <>
      <section className="quote h-screen w-screen flex justify-center">
        <main className="w-dvh h-dvh flex flex-col items-center p-2">
          {/* Search Box */}
          <div className="w-full flex justify-between items-center p-2">
            <h3 className="">Random Quotes</h3>
            <p>No Of Quotes: {count}</p>
          </div>
          {/* 10 Sec Quotes */}
          <div className=" w-full h-1/3 flex items-center justify-center">
            {fakeData.length > 0 && (
              <div className="card w-11/12 sm:w-4/6 !h-9/12 sm:!h-4/6 flex-wrap shadow-2xl">
                <div className="card-body">
                  <div className="card-title justify-between pe-3">
                    <h5 className=" capitalize italic">{fakeData[random]?.category}</h5>
                    <span className="countdown">
                      <span style={{ "--value": second }} aria-live="polite">{second}</span>
                    </span>
                  </div>
                  <p className="indent-10 italic">{fakeData[random]?.quote}</p>
                  <div className="">
                    <p className="float-right italic text-[16px]">— {fakeData[random]?.name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* All Quotes */}
          <div className=" w-full h-4/6 overflow-y-scroll p-2">
            <div className="join join-vertical w-full">
              {fakeData.map(({ id, name, quote, description, img, category, tags }) => (
                <div key={id} className="daisy-collapse collapse-arrow join-item shadow-2xs cursor-pointer gap-1">
                  <input type="radio" name="my-accordion-1" />
                  <div className="collapse-title font-semibold text-black flex items-center ps-2">{name}</div>
                  <div className="collapse-content text-sm text-black flex items-center justify-center" >
                    <div className="card w-5/6 shadow-2xs flex flex-col md:!flex-row items-center justify-center">
                      <figure className='w-2/6 h-full'>
                        <img className="w-full h-full" src={img} />
                      </figure>
                      <div className="card-body w-full">
                        <h6 className="card-title capitalize underline underline-offset-3">{category}</h6>
                        <table className="table">
                          <tbody>
                            <tr>
                              <th>Author: </th>
                              <td className='text-center italic'>{name}</td>
                            </tr>
                            <tr>
                              <th>Quote: </th>
                              <td className='text-center italic'>{quote}</td>
                            </tr>
                            <tr>
                              <th>Describe: </th>
                              <td className='text-center italic'>{description}</td>
                            </tr>
                            <tr>
                              <th>Tags: </th>
                              <td className='text-center italic'>
                                <span className="">{tags[0]} | </span>
                                <span className="">{tags[1]} | </span>
                                <span className="">{tags[2]} </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Quote