import Link from "next/link";
import CustomButton from "../Custombutton";

const GoogleLoginForm = () => {
    const googleLoginUrl =
        process.env.NEXT_PUBLIC_GOOGLE_LOGIN || "기본로그인URL"; // 기본 URL을 제공

    return (
        <Link href={googleLoginUrl} className="text-gray-600">
            <CustomButton buttonText="구글 로그인" />
        </Link>
    );
};

export default GoogleLoginForm;
