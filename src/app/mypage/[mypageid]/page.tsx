"use client";
import CustomButton from "@/app/components/Custombutton";
import React from "react";
import { useRouter } from "next/navigation";
const page = ({ params }: { params: { myvideoid: string } }) => {
    const router = useRouter();
    const myvideoid = params.myvideoid;
    const handleMoveVideo = () => {
        router.push(`/mypage/${myvideoid}/myvideo`);
    };
    const handleMoveComparePage = () => {
        router.push(`/mypage/${myvideoid}/videocompare`);
    };
    return (
        <>
            <div>사용자 정보</div>
            <div>
                <CustomButton
                    buttonText="영상 보러가기"
                    onClick={handleMoveVideo}
                ></CustomButton>
            </div>
            <div className="mt-2">
                <CustomButton
                    buttonText="비교하기"
                    onClick={handleMoveComparePage}
                ></CustomButton>
            </div>
        </>
    );
};

export default page;
