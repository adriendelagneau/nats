import { getArticles } from "@/actions/articlesActions";
import MainCard from "@/components/cards/MainCard";



export default async function Home() {

 
  const articles  = await getArticles()

  return (
    <main className="w-full   mx-auto mt-24">

  
    <div className='w-full my-10 text-center '>
         <h1 className='text-5xl font-semibold font-limeLight'>La Voie De L&rsquo;Info</h1>
        <p className="font-normal ">Votre fenêtre sur l&rsquo;actualité</p>
      </div>


      
      <div className="flex mx-auto h-auto gap-6">
        <div>
          <ul className="">
            {articles.data?.map((a, i) => (
              <div key={i}>
              <MainCard key={i} article={a} />
              <div className="w-[90%] h-[1px] mx-auto bg-slate-300 my-14"></div>
              </div>
            ))}
          </ul>
        </div>
        
        <div className="w-[250px] min-h-screen hidden 2xl:inline-block border-l bg-purple-800"></div>
      </div>
     
    </main>
  );
}
