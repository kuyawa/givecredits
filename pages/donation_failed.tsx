import { useRouter } from "next/router"
import Page from "components/page"
import Button from "components/button"
import Card from "components/card"
import Icon from "components/icon"


export default function DonationFailed(){
  const { ...router } = useRouter()

  return (
    <Page>
      <div className="relative mt-10">
        <Card className="p-6 mt-4 mx-6">
          <div className="flex flex-col items-center w-full">
            <Icon
              icon="warning"
              className="m-2 !text-3xl self-center text--300"
            ></Icon>
            <h1 className="text-center w-full text-2xl font-semibold text-red">
              Oops ! Your Payment was Declined
            </h1>
            <Button
              text="Back to Home"
              className="normal-case mt-6 px-3 bg-blue-600 mb-4"
              onClick={() => router.push('/')}
            ></Button>
          </div>
        </Card>
      </div>
    </Page>
  )
}