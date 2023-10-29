import { useRouter } from 'next/router'
import Page from 'components/Page'
import BackButton from 'components/BackButton'
import OrganizationList from 'components/OrganizationList'
import { Organization as OrganizationType } from 'types/registryTypes'
import { getOrganizations } from 'utils/registry'

export async function getServerSideProps() {
  try {
    let organizations: OrganizationType[] = await getOrganizations().catch(
      console.log
    )
    if(organizations.length>1) {
      organizations = organizations.sort((a, b) => (a.name < b.name ? 1 : -1))
    }
    return {
      props: { organizations }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        err: 'Something went wrong'
      }
    }
  }
}

export default function Organizations({organizations}: {organizations: OrganizationType[]}){
  const router = useRouter()
  return (
    <Page>
      <div>
        <BackButton />
        <OrganizationList
          organizations={organizations}
          onOrgPress={(org) => router.push(`/organizations/${org.id}`)}
        />
      </div>
    </Page>
  )
}
