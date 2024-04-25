import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import FormInputsComponent from "./FormInputsComponent";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectUser } from "../redux/user/userSlice";
import {
  addSocialMediaAccount,
  deleteSocialMediaAccounts,
  getUser,
} from "../api/userThunk";
import Account from "../pages/Auth/Account";

interface Account {
  id: number;
  social_media: string;
}

const SocialAccounts = () => {
  const dispatch = useAppDispatch();
  const { socialMedia, socialMediaError, currentUser, user } =
    useAppSelector(selectUser);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [data, setData] = useState<string>("");
  const id = currentUser?.user?.id;
  const [showAddButton, setShowAddButton] = useState<boolean>(true); 

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setData(value);
    },
    []
  );

  const handleAddAccount = () => {
    setIsShown(true);
  };

  const handleDeleteAccount = (accountId: number) => {
    dispatch(deleteSocialMediaAccounts(accountId)).then(() => {
      dispatch(getUser(id));
      setShowAddButton(true);
    });
  };

  const handleCreateAccount = () => {
    dispatch(addSocialMediaAccount({ id: id, social_media: data })).then(() => {
      dispatch(getUser(id));
      if (user.social_media.length >= 3) { 
        setShowAddButton(false); 
      }
    });
    setIsShown(false);
  };

  return (
    <div>
      <h3 className="font-bold text-[20px] text-custom-color3">
        Social Media Accounts
      </h3>
      <div>
        {user?.social_media ? (
          <div className="mt-6">
            {user.social_media.map((account: Account) => (
              <div
                key={account.id}
                className="flex justify-between items-center text-2xl border border-custom-color2 rounded-lg p-2 mt-4"
              >
                <a
                  href={account.social_media}
                  className="cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {account.social_media}
                </a>
                <MdDelete
                  className="cursor-pointer"
                  onClick={() => handleDeleteAccount(account.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <span>No social media accounts found</span>
        )}
      </div>
      {isShown ? (
        <div className="flex gap-2 mt-8">
          <div className="w-full">
            <FormInputsComponent
              id="social_media"
              type="text"
              placeholder="Social media account"
              value={socialMedia.social_media}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-2 mt-4 cursor-pointer font-bold">
            <IoIosSend
              onClick={handleCreateAccount}
              className="text-custom-color4 text-2xl"
            />
          </div>
        </div>
      ) : (
        ""
      )}
      {showAddButton && (
        <div className="mt-4">
          <button
            className="border border-custom-color2 text-custom-color4 py-2 w-full rounded-lg bg-white"
            onClick={handleAddAccount}
          >
            + Add account
          </button>
        </div>
      )}
    </div>
  );
};

export default SocialAccounts;
