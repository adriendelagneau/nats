import { getArticles } from "@/actions/articlesActions";
import MainGutter from "@/components/MainGutter";
import MainCard from "@/components/cards/MainCard";



export default async function Home() {

 
  const articles  = await getArticles({limit: 3})

  return (
    <main className="w-full   mx-auto mt-24">

  
      <div className='w-full my-10 text-center '>
         <h1 className='text-5xl font-semibold font-limeLight'>La Voie De L&rsquo;Info</h1>
        <p className="font-normal ">Votre fenêtre sur l&rsquo;actualité</p>
      </div>


      
      <div className="flex mx-auto h-auto gap-6 relative">
        
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
        <div className="h-screen sticky top-24">

      <MainGutter />
        </div>
      </div>
     
    </main>
  );
}
