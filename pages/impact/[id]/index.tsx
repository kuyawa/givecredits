import Page from 'components/page'
import Title from 'components/title'
import Event from 'components/event'
import styles from 'styles/common.module.css'
import { getStoriesByInitiative } from 'utils/registry'


export async function getServerSideProps({query}) {
  console.log('QUERY', query)
  const initid = query.id || ''
  console.log('InitID', initid)
  if(!initid){
    return { props: { stories:null } }
  }
  const stories = await getStoriesByInitiative(initid) || null
  //console.log('STORIES', stories)
  if(stories?.length>0){ stories.sort((a, b) => (a.created < b.created ? 1 : -1)) } // Sort by date desc
  return { props: { stories } }
}

export default function Impact({stories}) {
  return (
    <Page>
      <div className={styles.content}>
        <Title text="Impact Storyline" />
        <p className={styles.intro}>
          Your donations are helping people and communities around the world.
          Here is a storyline of recent events made possible with your help.
          Together we keep building a better world!
        </p>
        { stories?.length>0 ? stories.map((item) => (
          <div className={styles.mainBox + " my-4"} key={item.id}>
            <Event key={item.id} {...item} />
          </div>
        )) : (
          <h1 className="text-center text-2xl my-24">No stories found</h1>
        )}
      </div>
    </Page>
  )
}
