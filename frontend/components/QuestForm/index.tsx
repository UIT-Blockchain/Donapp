import { NearContextAtom } from "@atoms/app";
import { BOATLOAD_OF_GAS } from "@utils/constant";
import { yton } from "@utils/tools";
import { useRecoilValue } from "recoil";

const QuestForm = () => {
  const nearContext = useRecoilValue(NearContextAtom);

  const handleCreateQuest = async (amount: number, description: string) => {
    if (nearContext) {
      await nearContext.contract.create_quest(
        {
          id: "task 01",
          amount,
          description,
        },
        BOATLOAD_OF_GAS,
        yton(amount)
      );
    }
  };

  return (
    <div className="flex justify-end p-6 ">
      <button
        className="bg-gradient-to-b from-[#9C2CF3] to-[#3A49F9] hover:bg-purple-400  text-white font-bold w-[140px] py-6 px-8 rounded-lg text-xl"
        type="button"
        onClick={() => {
          handleCreateQuest(10, "hi");
        }}
      >
        {" "}
        Create
      </button>
    </div>
  );
};

export default QuestForm;
