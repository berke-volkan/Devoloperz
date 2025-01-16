import Empty from "@/components/empty";
import { Heading } from "@/components/heading";
import { CodeIcon, VideoIcon } from "lucide-react";
export default function Page() {
  return(
    <div className="container mx-auto p-4">
    <Heading
      title="Teams"
      description="Create and manage your teams"
      icon={VideoIcon}
      iconColor="text-blue-300"
      bgColor="bg-blue-300/10"
    />
    <Empty label='We are cooking this feature' />
  </div>
  )
}
