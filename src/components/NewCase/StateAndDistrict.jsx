import { useState, useEffect } from "react";
import { getAllStates, getDistrictsByState } from "../../api/E-Court/locationAPI";
import { validate } from "../../shared/util/validators";
import Dropdown from "../../shared/formElements/Dropdown";

const StateAndDistrict = ({ inputHandler, formState, validators }) => {

    const [states, setStates] = useState([]);
    const [allDistricts, setAllDistricts] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [isDistrictsDisabled, setIsDistrictsDisabled] = useState(true);

    useEffect(() => {
        const fetchStates = async () => {
            try {

                const response = await getAllStates();
                setStates(response);
            }
            catch (error) {
                console.log("FETCH ALL STATES ERROR:", error);
            }
        };

        fetchStates();
        return () => {
            setStates([]);
        }
    }, [setStates])

    useEffect(() => {
        if (selectedState) {
            inputHandler("state", selectedState.name, validate(selectedState.name, validators));

            const fetchDistricts = async () => {
                try {
                    const response = await getDistrictsByState(selectedState);
                    setAllDistricts(response);
                    setIsDistrictsDisabled(false);
                }
                catch (error) {
                    console.log("FETCH DISTRICTS BY STATE ERROR:", error);
                }
            };
            fetchDistricts();
            return () => {
                setAllDistricts([]);
            }
        }
        setAllDistricts([]);
        setIsDistrictsDisabled(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedState]);

    return (
        <div className="flex flex-row gap-4 justify-between mt-2">
            <div id="state-dd" >
                <Dropdown
                    id="state"
                    label="Select State"
                    data={states}
                    setSelectedItem={setSelectedState}
                    errorMessage="Must be a valid string"
                />
            </div>
            <div id="district-dd">
                <Dropdown
                    id="district"
                    label="Select District"
                    data={allDistricts}
                    setSelectedItem={(item) => {
                        inputHandler("district", item.name, validate(item.name, validators));
                    }}
                    placeholder="Select your district"
                    disabled={isDistrictsDisabled}

                />
            </div>
        </div>
    )

};

export default StateAndDistrict;
