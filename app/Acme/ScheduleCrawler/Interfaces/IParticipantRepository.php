<?php namespace Acme\Schedule\Interfaces;



Interface IParticipantRepository {

    public function getByActivitySessionId($activity_session_id);

    /**
     * $participant must contain activity_session_id and name
     *
     * @param $participant
     * @return mixed
     */
    public function storeOne($activity_session_id, $name);

    public function storePhoneNumber($activity_session_id, $phone_number);

}