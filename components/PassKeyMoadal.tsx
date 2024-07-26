'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"  
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"  
import { NEXT_PUBLIC_ADMIN_PASSKEY } from "@/lib/localVar";
import { decryptKey, encryptKey } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"


const PassKeyMoadal = () => {
    const router = useRouter();
    const path = usePathname();
    const [open, setOpen] = useState(true);
    const [passKey, setPassKey] = useState('');
    const [error, setError] = useState('');

    const encryptedkey = typeof window !== 'undefined' ? window.localStorage.getItem('accesskey') : null;

    useEffect(() => {
        const accesskey = encryptedkey && decryptKey(encryptedkey)

        if(path){
            if(accesskey === NEXT_PUBLIC_ADMIN_PASSKEY){
                setOpen(false)
                router.push('/admin')
            }else{
                setOpen(true)
            }   
        }
    }, [encryptedkey])

    const closeModal = () => {
        setOpen(false)
        router.push('/')
    }

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(passKey === NEXT_PUBLIC_ADMIN_PASSKEY){
            const encryptedkey = encryptKey(passKey);
            localStorage.setItem('accesskey', encryptedkey)
            setOpen(false)
        }else{
            setError('Invalid passkey, please try again!')
        }
    }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="shad-alert-dialog">
            <AlertDialogHeader>
                <AlertDialogTitle className="flex items-start justify-between">
                    Admin Access Verification
                    <Image
                        src='/assets/icons/close.svg'
                        alt="close"
                        width={24}
                        height={24}
                        onClick={() => closeModal()}
                        className="cursor-pointer"
                    />
                </AlertDialogTitle>
                <AlertDialogDescription>
                    To accesss the admin page, please enter the passkey.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <div>
                <InputOTP maxLength={6} value={passKey} onChange={(value) => setPassKey(value)}>
                    <InputOTPGroup className="shad-otp">
                        <InputOTPSlot className="shad-otp-slot" index={0} />
                        <InputOTPSlot className="shad-otp-slot" index={1} />
                        <InputOTPSlot className="shad-otp-slot" index={2} />
                        <InputOTPSlot className="shad-otp-slot" index={3} />
                        <InputOTPSlot className="shad-otp-slot" index={4} />
                        <InputOTPSlot className="shad-otp-slot" index={5} />
                    </InputOTPGroup>
                </InputOTP>
                {error && (
                    <p className="flex text-14-regular justify-center mt-4 shad-error">
                        {error}
                    </p>
                )}
            </div>
            <AlertDialogFooter>
                <AlertDialogAction className="shad-primary-btn w-full" onClick={(e) => validatePasskey(e)}>
                    Enter Admin Passkey
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

  )
}

export default PassKeyMoadal