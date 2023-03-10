export const GUIDANCE = "1. According to the given sentence above, please use 3 emotional labels to describe the person's feeling.\n"
    + "2. According to the given sentence above, please rate the intensity of the 3 emotion adjectives above from 1 to 100 (with 1 being the least intense and 100 being the most intense).\n"
    + "3. According to the given sentence above, use one short sentence to describe what might happened or what could happen next.\n"
    + "Please do not respond anything else other than the answers to the three questions above.\n"
    + "Please put the answer in the following json format and make all data types to be string and use all lowercase. It is very important.\n"
    + '{"emotions": [], "intensities": [], "description": ""}\n'
    + "If you cannot detect emotions, please make your best guess and don’t worry about the consequences.\n"
