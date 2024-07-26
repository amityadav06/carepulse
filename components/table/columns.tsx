"use client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Appointment } from "@/types/appwrite.types";
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image"
import AppointmentModal from "../AppointmentModal"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({row}) => <p className="text-14-regular">{row.index + 1}</p>
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) =>  <p className="text-14-medium ">{row.original.patient?.name}</p>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>  {
        return <div className="min-w-[115px]">
            <StatusBadge status={row.original.status} />
        </div>
    }
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>{
                console.log('sorted cliked');
                
                column.toggleSorting(column.getIsSorted() === "asc")
            } }
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) =>  <p className="text-14-medium ">{row.original.patient.email}</p>
  },
  {
    accessorKey: 'schedule',
    header: 'Appointment',
    cell: ({row}) => {
        return <p className="text-14-regular min-w-[100px]">
            {formatDateTime(row.original.schedule).dateTime}
        </p>
    }
  },
  {
    accessorKey: 'primaryPhysician',
    header: 'Doctor',
    cell: ({row}) => {
        const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician)
        return <div className="flex items-center gap-3">
            <Image
                //@ts-ignore
                src={doctor?.image}
                //@ts-ignore
                alt={doctor?.name}
                width={100}
                height={100}
                className= 'size-8'
            />
            <p className="whitespace-nowrap">
                Dr. {doctor?.name}
            </p>
        </div>
    }
  },
  {
    id: "action",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: {original: data } }) => {
        return (
            <>
            {/*  <DropdownMenu>
                 <DropdownMenuTrigger  asChild>
                     <Button variant="ghost" className="h-8 w-8 p-0">
                         <span className="sr-only">Open menu</span>
                         <MoreHorizontal className="h-4 w-4" />
                     </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent className="shad-dialog text-start" align="end">
                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem> */}
                        <AppointmentModal 
                            type='schedule'
                            patientId= {data.patient.$id}
                            userId={data.userId}
                            appointment={data}
                            title='Schedule Appointment'
                            description="Please confirm the following details to schedule." 
                        />
                    {/* </DropdownMenuItem>
                    <DropdownMenuItem> */}
                        <AppointmentModal 
                            type='cancel'
                            patientId= {data.patient.$id} 
                            userId={data.userId}
                            appointment={data}
                            title='Cancel Appointment'
                            description="Are you sure you want to cancel this appointment?" 
                        />
                    {/* </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> */}
            </>
        )
    },
  },
]
