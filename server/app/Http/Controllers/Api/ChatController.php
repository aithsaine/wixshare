<?php

namespace App\Http\Controllers\Api;

use App\Models\Chat;
use App\Events\SendMessage;
use Illuminate\Http\Request;
use App\Events\MessageNotification;
use App\Http\Controllers\Controller;

class ChatController extends Controller
{
    public function getChat(Request $request)
    {

        $messges = array_merge($request->user()->receivedMessages->toArray(), $request->user()->sendMessages->toArray());
        return response()->json(["messages" => $messges]);
    }

    public function saveMessage(Request $request)
    {
        $message = new Chat();
        $message->sender_id = $request->user()->id;
        $message->receiver_id = $request->receiver_id;
        $message->message = $request->message;
        $message->save();
        $response =
            response()->json(["success" => true, "message" => $message]);
        event(new SendMessage($message));
        event(new MessageNotification($message));
    }


    public function markseen(Request $request, $receiver_id, $sender_id)
    {
        $chats = Chat::where("receiver_id", $receiver_id)
            ->where("sender_id", $sender_id)
            ->whereNull("seen_at")
            ->get();

        // Update the seen_at field for the retrieved chats
        $chats->each(function ($chat) {
            $chat->update(['seen_at' => now()]);
        });

        return response()->json(["success" => true, "messages" =>  array_merge($request->user()->receivedMessages->toArray(), $request->user()->sendMessages->toArray())]);
    }

    public function getUnseenMessages(Request $request)
    {
        $value =  count(Chat::where("receiver_id", $request->user()->id)->whereNull("seen_at")->get());
        return response()->json($value);
    }
}
