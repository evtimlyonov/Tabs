import { useEffect, useState } from 'react';
const url = 'https://course-api.com/react-tabs-project';

interface CompanyInt {
  id: string;
  company: string;
  dates: string;
  duties: string[];
  order: number;
  title: string;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState<CompanyInt[]>([]);
  const [current, setCurrent] = useState(0);

  const fetchUrl = async () => {
    try {
      const fetching = await fetch(url);
      const data = await fetching.json();
      setCompany(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-5xl font-bold text-[#102a42] mb-3 animate-pulse'>
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <main className='transition ease-in mt-20 duration-500'>
      <div className='flex flex-col items-center mb-10'>
        <h1 className='text-5xl font-bold text-[#102a42] mb-3'>Experience</h1>
        <div className='bg-[#2caeba] h-1 w-20'></div>
      </div>
      <div className='flex justify-center uppercase text-xl mb-16'>
        {company.map((com, idx) => (
          <button
            key={com.id}
            className={`transition duration-500 mx-2 py-1 ${
              current === idx && 'text-[#2caeba]'
            } hover:text-[#2caeba] tracking-widest font-semibold active:text-[#2caeba]`}
            onClick={setCurrent.bind(null, idx)}>
            {com.company}
          </button>
        ))}
      </div>

      <div>
        <article className='mx-20'>
          <h3 className='text-3xl tracking-wider mb-2'>
            {company[current].title}
          </h3>
          <h4 className='text-[#617d98] bg-[#dae2ec] inline-block font-bold px-2 py-1 rounded mb-4'>
            {company[current].company}
          </h4>
          <p className='text-[#617d98] tracking-widest mb-5'>
            {company[current].dates}
          </p>
          {company[current].duties.map((duty, idx) => (
            <div key={idx} className='flex items-center'>
              <svg
                stroke='currentColor'
                fill='currentColor'
                strokeWidth='0'
                viewBox='0 0 448 512'
                className='w-6 text-[#2caeba]'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z'></path>
              </svg>
              <p className='pl-4 my-3'>{duty}</p>
            </div>
          ))}
        </article>
      </div>
    </main>
  );
}

export default App;
