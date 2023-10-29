//import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';
import Page from 'components/Page'
//import Card from 'components/Card'
import BackButton from 'components/BackButton'
import DonationTierRow from 'components/DonationTierRow'
import CarbonChart from 'components/CarbonChart'
import TextRow from 'components/TextRow'
import { getOrganizationById } from 'utils/registry'
import Session from 'utils/session'
import getRates from 'utils/rates'


export async function getServerSideProps({req,query}){
  const session = Session(req)
  const organization = await getOrganizationById(query.organizationId)
  const rate = await getRates('XLM')
  //const rate = 0.12
  return {
    props: {
      session,
      organization,
      rate
    }
  }
}

function Initiatives(organization, initiatives, wallet, rate) {
  const router = useRouter()
  return (
    <>
      {initiatives.map((initiative) => {
        if(initiative.inactive){ return null }
        //console.log('initcredit', initiative.credits)
        const credit = initiative.credits?.length>0 ? initiative.credits[0].value : 0
        const destinationTag = initiative.tag || 0
        const impactUrl = '/impact/'+initiative.id
        //console.log('CREDIT', credit)
        //console.log('DestTAG', destinationTag)
        return (
          <div key={initiative.id} data-initiative={initiative.id} className="mb-12">
            <div className="flex flex-row justify-start mb-4">
              <Image src={initiative.defaultAsset || ''} width={100} height={100} alt={initiative.title} className="w-[100px] h-[100px] mt-6 rounded-lg" />
              <div className="flex flex-col justify-start ml-4">
                <TextRow
                  label="Initiative"
                  text={initiative.title}
                  className="p-0"
                />
                <p>{initiative.description}</p>
                <p><Link className="text-slate-400" href={impactUrl}>See impact storyline &raquo;</Link></p>
              </div>
            </div>
            {/*
            {initiative.tiers.map((tier) => {
              return (
                <DonationTierRow
                  key={tier.title}
                  title={tier.title}
                  description={`Donate a minimum of ${tier.amount.value} ${tier.amount.currency} to receive a ${tier.title} NFT`}
                  image={tier.asset||"/noimage.png"}
                  value={tier.amount.value}
                  onClick={(amount) => {
                    router.push({
                      pathname: `${organization.id}/donation_summary`,
                      query: {
                        amount,
                        wallet,
                        destinationTag: initiative.tag,
                        initiativeId: initiative.id
                      }
                    })
                  }}
                />
              )
            })}
            */}
            <DonationTierRow
              title="Custom Amount"
              image={"/noimage.png"}
              value={1}
              credit={credit}
              rate={rate}
              onClick={(amount,credit) => {
                router.push({
                  pathname: `${organization.id}/donation_summary`,
                  query: {
                    amount,
                    credit,
                    wallet,
                    destinationTag,
                    initiativeId: initiative.id
                  }
                })
              }}
            />
            <CarbonChart title="Total estimated carbon emissions retired" value={12.60} />
          </div>
        )
      })}
    </>
  )
}

export default function Organization({ session, organization, rate }) {
  const logo = organization?.image || '/noimage.png'
  const wallet = session.wallet
  const initiatives = organization?.initiative // Now using initiatives table
  //console.log('Initiatives', initiatives)
  //console.log('Credits', initiatives[0].credits)
  return (
    <Page>
      <div>
        <BackButton />
        <header className="w-full relative p-6 mt-6">
        <div className="bottom-0 flex flex-row justify-start items-start align-start">
          <div className="aspect-square w-[150px] h-[150px] rounded-xl flex flex-col self-center justify-center text-center items-start mb-4">
            {logo ? (
              <Image src={logo} width={150} height={150} alt={organization.name} className="w-[150px] h-[150px] rounded-xl" />
            ) : (
              <span>organization?.name?.[0]</span>
            )}
          </div>
          <div className="ml-4">
            <h5 className="uppercase text-gray-400 block">Donate To</h5>
            <h1 className="sm:text-lg lg:text-2xl font-semibold block">
              {organization.name}
            </h1>
            <p>{organization.description}</p>
            <p><Link className="text-slate-400" href={organization.url}>{organization.url}</Link> <span className="text-gray-700 mx-4"> • </span> <Link className="text-slate-400" href={"mailto:"+organization.email}>Send an Email</Link></p>
          </div>
          </div>
          <div className="bg-gradient-to-t from-green-800 to-transparent absolute top-0 left-0 right-0 bottom-0 -z-10 rounded-lg" />
        </header>
        <div className="p-6">{Initiatives(organization, initiatives, wallet, rate)}</div>
      </div>
    </Page>
  )
}
