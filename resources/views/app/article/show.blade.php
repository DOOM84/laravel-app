@extends('layouts.app')

@section('hero')
    @include('app.partials.hero')
@endsection

@section('content')
<div id="app">

    <article-component></article-component>
    <br>
    <comments-component></comments-component>
</div>
@endsection
@section('vue')
    <script src="{{mix('/js/app.js')}}"></script>
@endsection
