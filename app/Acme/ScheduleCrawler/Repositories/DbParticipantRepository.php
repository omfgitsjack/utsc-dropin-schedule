<?php namespace Acme\Schedule\Repositories;

// Inhouse dependencies
use Acme\Schedule\Interfaces\IParticipantRepository;
use Participant;


class DbParticipantRepository implements IParticipantRepository
{

    // Dependencies
    protected $model;

    /**
     * Dependency Injection
     * @param Participant $participant Participant Object
     */
    function __construct(Participant $participant)
    {
        $this->model = $participant;
    }

    /**
     * Get Participants by it's activity Id
     *
     * @param $activity_session_id
     */
    public function getParticipantsByActivitySessionId($activity_session_id)
    {
        // TODO: Implement getParticipantsByActivitySessionId() method.
    }

    /**
     * Stores participant by it's name into an activity session
     *
     * @param $activity_session_id
     * @param $name
     * @return Participant Model
     */
    public function storeOne($activity_session_id, $name)
    {
        //dd($activity_session_id);
        return $this->model->create([
            'activity_session_id' => $activity_session_id,
            'name' => $name
        ]);
    }

    public function storePhoneNumber($activity_session_id, $phone_number)
    {
        // TODO: Implement storePhoneNumber() method.
    }

    public function getByActivitySessionId($activity_session_id)
    {
        return $this->model
            ->where('activity_session_id', $activity_session_id);
    }
}