<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'body', 'img', 'slug'];
    //protected $guarded = [];

    public $dates = ['published_at'];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function state()
    {
        return $this->hasOne(State::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function getBodyPreview()
    {
        return Str::limit($this->body, 100);
    }

    public function createdAtForHumans()
    {
        //return $this->created_at->diffForHumans();
        return $this->published_at->diffForHumans();
    }

    public function scopeLastLimit($query, $numbers)
    {
       return $query->with('state', 'tags')->orderBy('created_at', 'desc')->limit($numbers)->get();
    }

    public function scopeAllPaginate($query, $numbers)
    {

        return $query->with('state', 'tags')->orderBy('created_at', 'desc')->paginate($numbers);

    }
    public function scopeFindByTag($query)
    {

        return $query->with('state', 'tags')->orderBy('created_at', 'desc')->paginate(10);

    }

    public function scopeFindBySlug($query, $slug)
    {

        return $query->with('comments', 'state', 'tags')->where('slug', $slug)->firstOrFail();

    }
}
